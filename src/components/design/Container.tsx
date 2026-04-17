import { cx } from '../../lib/cx'

type ContainerSize = 'screen' | 'narrow'

type ContainerProps = {
    children: React.ReactNode
    className?: string
    size?: ContainerSize
}

const sizeMap: Record<ContainerSize, string> = {
    screen: 'max-w-screen-2xl',
    narrow: 'max-w-4xl',
}

export function Container({ children, className, size = 'screen' }: ContainerProps) {
    return <div className={cx('mx-auto px-4 sm:px-8 lg:px-10', sizeMap[size], className)}>{children}</div>
}
