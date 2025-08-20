import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  surname: string;
  userType: "contractor" | "customer";
  expertise?: string;
  phone: string;
  email: string;
}

const Home = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [listings, setListings] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(user);
    setCurrentUser(parsedUser);

    // Get all users except current user for listings
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const otherUsers = allUsers.filter((u: User) => u.id !== parsedUser.id);
    setListings(otherUsers);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {currentUser.name}</h1>
            <p className="text-sm text-muted-foreground">
              Logged in as: <Badge variant="secondary">{currentUser.userType}</Badge>
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {currentUser.userType === "contractor" ? "Available Customers" : "Available Contractors"}
            </h2>
            
            {listings.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    No {currentUser.userType === "contractor" ? "customers" : "contractors"} available yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {listings
                  .filter(user => user.userType !== currentUser.userType)
                  .map((user) => (
                    <Card key={user.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {user.name} {user.surname}
                          <Badge variant="outline">{user.userType}</Badge>
                        </CardTitle>
                        {user.expertise && (
                          <CardDescription>{user.expertise}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p><strong>Email:</strong> {user.email}</p>
                          <p><strong>Phone:</strong> {user.phone}</p>
                        </div>
                        <Button className="w-full mt-4" size="sm">
                          Contact
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;