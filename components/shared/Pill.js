import CircledXIcon from '~/icons/CircledX'

const Pill = ({ children, onClear }) => {
  return (
    <div className='flex items-center px-4 py-2 text-sm border text-slate-600 rounded-3xl border-slate-400 bg-slate-200 whitespace-nowrap'>
      <span>{children}</span>
      {onClear ? (
        <button
          className='w-5 h-5 ml-2 font-semibold text-gray-600 disabled:text-gray-400'
          onClick={onClear}
        >
          <CircledXIcon />
        </button>
      ) : null}
    </div>
  )
}

export default Pill
