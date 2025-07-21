import Image from 'next/image';

interface SpaceLogoIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SpaceLogoIcon({ 
  width = 40, 
  height = 40,
  className = ''
}: SpaceLogoIconProps) {
  return (
    <Image
      src="/space-logo.svg"
      alt="Space Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}