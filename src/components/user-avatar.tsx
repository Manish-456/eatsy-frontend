interface UserAvatarProps {
  imageUrl: string;
}
export function UserAvatar({ imageUrl }: UserAvatarProps) {
  return (
    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
      <img
        src={imageUrl}
        className="h-full w-full object-cover rounded-full"
        alt="user avatar"
      />
    </div>
  );
}
