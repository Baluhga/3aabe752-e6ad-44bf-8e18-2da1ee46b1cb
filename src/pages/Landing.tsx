import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <p className="text-xl text-muted-foreground">
            Connect contractors with customers
          </p>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Choose an option to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/login" className="block">
                <Button className="w-full" size="lg">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Create Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;