import { ExternalLink, FileText, PlayCircle } from 'lucide-react'

const link = [
  { title: 'Member Handbook', icon: <FileText size={18} />, href: '#' },
  { title: 'Introduction Video', icon: <PlayCircle size={18} />, href: '#' },
]

export const QuickLinks = ({ links }: { links: any }) => (
  <div className='space-y-3'>
    <h3 className='text-sm font-semibold uppercase tracking-wider text-slate-400 px-1'>
      Resources
    </h3>
    {link.map((link) => (
      <a
        key={link.title}
        href={link.href}
        className='flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group'
      >
        <div className='flex items-center gap-3'>
          <span className='text-slate-400 group-hover:text-primary transition-colors'>
            {link.icon}
          </span>
          <span className='font-medium'>{link.title}</span>
        </div>
        <ExternalLink size={14} className='text-slate-300' />
      </a>
    ))}
  </div>
)
