import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, PlusCircle } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}

export const AdminLayout = ({ children, title, action }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Site
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                <h1 className="text-2xl font-bold">{title}</h1>
              </div>
            </div>
            {action}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};