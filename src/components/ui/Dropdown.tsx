// components/ui/Dropdown.tsx
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { cn } from '../../lib/utils';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Dropdown({ trigger, children, className }: DropdownProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>{trigger}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            'absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-black border border-white/10 shadow-lg focus:outline-none',
            className
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

// To make it easier to add items (optional)
Dropdown.Item = Menu.Item;