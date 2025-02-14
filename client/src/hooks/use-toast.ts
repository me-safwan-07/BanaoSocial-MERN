"use client";
// Inspired by react-hot-toast library
import * as React from "react"

// Constants
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

// Action types
// const actionTypes = {
//   ADD_TOAST: "ADD_TOAST",
//   UPDATE_TOAST: "UPDATE_TOAST",
//   DISMISS_TOAST: "DISMISS_TOAST",
//   REMOVE_TOAST: "REMOVE_TOAST"
// };

let count = 0;

function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, NodeJS.Timeout>();

const addToRemoveQueue = (toastId: string): void => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// Types for state and actions
interface Toast {
  id: string;
  open: boolean;
  message: string;
  variant?: string;  // e.g., 'success', 'error'
  description?: string;
  onOpenChange?: (open: boolean) => void;
  title?: string
}

interface ToastState {
  toasts: Toast[];
}

interface ToastAction {
  type: string;
  toast?: Toast;
  toastId?: string;
}

interface ToastProps {
  message: string;
  description?: string;
  variant?: string;
  onOpenChange?: (open: boolean) => void;
}

// Reducer
const reducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast!, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast!.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

const listeners: ((state: ToastState) => void)[] = [];

let memoryState: ToastState = { toasts: [] };

// Dispatch function
function dispatch(action: ToastAction): void {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Toast function to manage toasts
function toast({
  message,
  description,
  variant,
  onOpenChange,
}: ToastProps) {
  const id = genId();

  const update = (props: ToastProps): void =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id, open: true },
    });
  const dismiss = (): void => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      id,
      message,
      description,
      variant,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
        if (onOpenChange) onOpenChange(open);
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

// Custom hook to use toasts
function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId: string) =>
      dispatch({ type: "DISMISS_TOAST", toastId: toastId }),
  };
}

export { useToast, toast };
