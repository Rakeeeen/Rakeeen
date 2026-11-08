import '@/ui/filterTabs.css';

interface FilterTabsProps<T extends string> {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

/**
 * A row of round choices where exactly one is on, for filtering a list. The buttons share their
 * space: pressing one reaches towards its neighbours (motion.css, .spring-group).
 */
export function FilterTabs<T extends string>({ options, value, onChange, label }: FilterTabsProps<T>) {
  return (
    <div className="filter-tabs spring-group" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="filter-tabs__tab"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
