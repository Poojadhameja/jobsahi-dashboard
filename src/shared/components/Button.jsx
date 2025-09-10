import React from 'react';
import { TAILWIND_COLORS, COLORS } from '../WebConstant';

const baseClasses = 'rounded-lg transition-colors duration-200 inline-flex items-center justify-center';

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-4 py-2 text-sm md:text-base',
  lg: 'px-6 py-3 text-base'
};

const variants = {
  primary: `${TAILWIND_COLORS.BTN_PRIMARY}`,
  outline: 'bg-white border border-[#5B9821] text-[#5B9821] hover:bg-green-50',
  light: `${TAILWIND_COLORS.BTN_LIGHT}`,
  neutral: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
  secondary: `${TAILWIND_COLORS.BTN_SECONDARY}`,
  success: 'bg-[#16A34A] text-white hover:opacity-90',
  warning: 'bg-[#F59E0B] text-white hover:opacity-90',
  danger: 'bg-[#DC2626] text-white hover:opacity-90',
  info: 'bg-[#0B537D] text-white hover:opacity-90',
  unstyled: ''
};

const Button = ({
  children,
  type = 'button',
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth = false,
  loading = false,
  disabled = false,
  as,
  href,
  ...rest
}) => {
  const variantClasses = variants[variant] || variants.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const widthClass = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;

  const content = (
    <>
      {icon ? <span className="mr-2" aria-hidden>{icon}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className="ml-2" aria-hidden>{iconRight}</span> : null}
      {loading ? (
        <span className="ml-2 inline-flex" aria-hidden>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </span>
      ) : null}
    </>
  );

  const commonProps = {
    onClick,
    className: `${baseClasses} ${sizeClass} ${variantClasses} ${widthClass} ${className}`.trim(),
    'aria-busy': loading || undefined,
    'aria-disabled': isDisabled || undefined,
    ...rest
  };

  if (as === 'a' || href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={isDisabled} {...commonProps}>
      {content}
    </button>
  );
};

// Helper to create named variant components with default label and displayName
const createNamedVariant = (displayName, variant) => {
  const Comp = ({ children, ...props }) => (
    <Button {...props} variant={variant}>
      {children ?? displayName}
    </Button>
  );
  Comp.displayName = displayName;
  return Comp;
};

// Named variant components for convenience
export const PrimaryButton = createNamedVariant('Primary', 'primary');
export const OutlineButton = createNamedVariant('Outline', 'outline');
export const LightButton = createNamedVariant('Light', 'light');
export const NeutralButton = createNamedVariant('Neutral', 'neutral');
export const SecondaryButton = createNamedVariant('Secondary', 'secondary');
export const SuccessButton = createNamedVariant('Success', 'success');
export const WarningButton = createNamedVariant('Warning', 'warning');
export const DangerButton = createNamedVariant('Danger', 'danger');
export const InfoButton = createNamedVariant('Info', 'info');
export const UnstyledButton = createNamedVariant('Button', 'unstyled');

// Size-specific helpers
export const SmallButton = (props) => <Button {...props} size="sm" />;
export const MediumButton = (props) => <Button {...props} size="md" />;
export const LargeButton = (props) => <Button {...props} size="lg" />;

// Icon-only button
export const IconButton = ({ label, className = '', size = 'sm', ...props }) => (
  <Button
    aria-label={label}
    title={label}
    className={`p-2 ${className}`}
    size={size}
    {...props}
  />
);

// Simple Button group wrapper
export const ButtonGroup = ({ className = '', children, ...rest }) => (
  <div className={`inline-flex items-center gap-3 ${className}`} {...rest}>
    {children}
  </div>
);

// Filter Button Component
export const FilterButton = ({ onClick, className = '', ...props }) => (
  <Button 
    variant="outline" 
    size="md"
    className={`w-full sm:w-auto ${className}`}
    onClick={onClick}
    icon={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
      </svg>
    }
    {...props}
  >
    Filter
  </Button>
);

// New Campaign Button Component
export const NewCampaignButton = ({ onClick, className = '', ...props }) => (
  <Button 
    variant="primary" 
    size="md"
    className={`w-full sm:w-auto ${className}`}
    onClick={onClick}
    icon={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    }
    {...props}
  >
    New Campaign
  </Button>
);

export default Button;


