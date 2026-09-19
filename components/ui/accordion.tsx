'use client';
import * as React from 'react';
import * as Primitive from '@radix-ui/react-accordion';
import { ArrowDownIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

// Better Design's Radix disclosure. CSS handles this small control transition;
// GSAP remains the only page choreography engine. Icons are owned SVGs.
const Accordion = Primitive.Root;
function AccordionItem({ className, ...props }: React.ComponentProps<typeof Primitive.Item>) {
  return <Primitive.Item className={cn('ds-accordion-item', className)} {...props} />;
}
function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof Primitive.Trigger>) {
  return <Primitive.Header><Primitive.Trigger className={cn('ds-accordion-trigger', className)} {...props}>{children}<ArrowDownIcon aria-hidden="true" /></Primitive.Trigger></Primitive.Header>;
}
function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof Primitive.Content>) {
  return <Primitive.Content className="ds-accordion-content" {...props}><div className={cn('ds-accordion-body', className)}>{children}</div></Primitive.Content>;
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
