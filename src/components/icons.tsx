type IconProps = {
  size?: number;
  className?: string;
};

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Icon({ size = 20, className, children }: React.PropsWithChildren<IconProps>) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      {children}
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Icon>
  );
}

export function FlashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m13 2-8 10h5l-1 10 8-10h-5z" />
    </Icon>
  );
}

export function SwapIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h11" />
      <path d="m12 3 3 4-3 4" />
      <path d="M20 17H9" />
      <path d="m12 21-3-4 3-4" />
    </Icon>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="13" r="3.4" />
    </Icon>
  );
}

export function NotebookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 3h10v18H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </Icon>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
      <path d="M19 13l.9 2.1L22 16l-2.1.9L19 19l-.9-2.1L16 16l2.1-.9L19 13Z" />
    </Icon>
  );
}

export function ImagesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="7" width="13" height="13" rx="2.5" />
      <path d="M8 11.5 10.4 14l2-2.1 4.6 4.6" />
      <circle cx="8.2" cy="10" r="1.2" />
      <path d="M7 4h12a2 2 0 0 1 2 2v12" />
    </Icon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.8v2.1" />
      <path d="M12 18.1v2.1" />
      <path d="M3.8 12h2.1" />
      <path d="M18.1 12h2.1" />
      <path d="m6 6 1.5 1.5" />
      <path d="m16.5 16.5 1.5 1.5" />
      <path d="m18 6-1.5 1.5" />
      <path d="m7.5 16.5-1.5 1.5" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m8 5 11 7-11 7V5Z" />
    </Icon>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 6v12" />
      <path d="M16 6v12" />
    </Icon>
  );
}

export function VolumeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 10v4h3l4 4V6L8 10H5Z" />
      <path d="M15.5 8.5a4 4 0 0 1 0 7" />
      <path d="M18 5a8 8 0 0 1 0 14" />
    </Icon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.2 1 6.1L12 16.7 6.6 19.7l1-6.1-4.4-4.2 6.1-.9L12 3Z" />
    </Icon>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16 8a3 3 0 1 0-2.8-4" />
      <path d="M8 13l8-4" />
      <path d="m8 13 8 4" />
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
    </Icon>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 3H3v6" />
      <path d="M15 3h6v6" />
      <path d="M3 15v6h6" />
      <path d="M21 15v6h-6" />
    </Icon>
  );
}

export function BackIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 6 8 12l6 6" />
    </Icon>
  );
}

export function ScanIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 3H3v4" />
      <path d="M17 3h4v4" />
      <path d="M3 17v4h4" />
      <path d="M21 17v4h-4" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </Icon>
  );
}
