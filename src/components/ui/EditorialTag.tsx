import React from 'react'

interface EditorialTagProps {
  label: string
  variant?: 'ember' | 'muted' | 'outline'
  size?: 'sm' | 'md'
}

const EditorialTag: React.FC<EditorialTagProps> = ({
  label,
  variant = 'outline',
  size = 'sm',
}) => {
  const base = 'inline-flex items-center font-body font-medium uppercase tracking-widest'
  const sizes = {
    sm: 'text-[9px] px-2 py-1',
    md: 'text-[10px] px-3 py-1.5',
  }
  const variants = {
    ember: 'bg-ember text-off-white',
    muted: 'bg-ash text-mist border border-graphite',
    outline: 'border border-smoke/40 text-smoke',
  }

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {label}
    </span>
  )
}

export default EditorialTag

