import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import type { RecentSignup } from "../../../services/dashboardApi";

interface LatestUserSignupsTableProps {
  data: RecentSignup[] | undefined;
  isLoading: boolean;
}

export function LatestUserSignupsTable({ data, isLoading }: LatestUserSignupsTableProps) {
  return (
    <Card className="md:col-span-6">
      <CardHeader>
        <CardTitle>Latest User Signups</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Recent users who joined the app
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
          <div className="max-h-[400px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Signup Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <span className="text-muted-foreground">Loading users...</span>
                    </TableCell>
                  </TableRow>
                ) : !data || data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((user, index) => (
                    <TableRow key={`${user.email}-${index}`} className="hover:bg-primary/5 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.profileImage} alt={user.name} />
                            <AvatarFallback className="bg-primary text-white text-xs">
                              {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>{user.city}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {format(new Date(user.signupDate), 'MMM dd, yyyy')}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(user.signupDate), 'hh:mm a')}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

