
import {Link} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuLogOut } from "react-icons/lu";

// type Props = {
//     user: Pick<User, "name" | "image" | "email">;
// };
// { user }: Props

export function UserNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative rounded">
                    <span className="text-lg">
                        {/* {user.name} */}
                        Username
                        </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {/* {user.name &&  */}
                        <p className="font-medium">
                            {/* {user.name} */}
                            Username
                            </p>
                            {/* } */}
                        {/* {user.email && ( */}

                            <p className="w-[200px] truncate text-sm text-zinc-700">
                                {/* {user.email} */}
                                Email Address
                            </p>
                        {/* )} */}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Button
                        variant="outline"
                        className="w-full"
                       
                    >
                        <LuLogOut className="mr-2 h-4 w-4"  />
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}