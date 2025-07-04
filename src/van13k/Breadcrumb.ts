import { classify, clickify, div, Link, span, VanValue } from '@van13k'
import { breadcrumb, breadcrumbTitle } from './Breadcrumb.module.css'

export interface BreadcrumbItem {
  label: VanValue
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return div(
    { class: breadcrumb },
    ...items.flatMap((item, index) => {
      const elements = []

      // Add separator if not the first item
      if (index > 0) {
        elements.push(span(' > '))
      }

      // Add the item itself
      if (item.href) {
        elements.push(
          Link(
            {
              href: item.href,
            },
            item.label
          )
        )
      } else if (item.onClick) {
        elements.push(
          span(
            {
              ...classify(breadcrumbTitle),
              ...clickify(item.onClick),
            },
            item.label
          )
        )
      } else {
        elements.push(span(typeof item.label === 'function' ? item.label : item.label))
      }

      return elements
    })
  )
}
