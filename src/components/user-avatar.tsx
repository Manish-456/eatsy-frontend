import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface UserAvatarProps {
  imageUrl: string;
}
export function UserAvatar({ imageUrl }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>
        CN
      </AvatarFallback>
    </Avatar>
  );
}
