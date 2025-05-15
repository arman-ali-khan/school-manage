import Link from 'next/link';
import { School } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <School className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">EduManage</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Comprehensive school management system for student registration, certificate management, and exam management.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/registration" className="text-muted-foreground hover:text-primary">
                  Student Registration
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-muted-foreground hover:text-primary">
                  Certificate Management
                </Link>
              </li>
              <li>
                <Link href="/exams" className="text-muted-foreground hover:text-primary">
                  Exam Management
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EduManage School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}