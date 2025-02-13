import Button from '@/components/ui/Button';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-serif">
            Medium
          </a>

          <div className='flex space-x-4'>
            <div className="hidden md:flex items-center space-x-6">

            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Our story
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Membership
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Write
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Sign in
            </a>
            </div>
            <Button>Get started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="container mx-auto py-4 px-2 md:py- lg:py-">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-6xl lg:text-7xl font-serif tracking-tight">Human stories & ideas</h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                A place to read, write, and deepen your understanding
              </p>
              <Button size="lg" className="text-lg px-8">
                Start reading
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://static.vecteezy.com/system/resources/previews/003/419/176/large_2x/content-creator-online-blogger-illustration-vector.jpg"
                className="relative w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Help
            </a>
            <a href="#" className="hover:text-foreground">
              About
            </a>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
