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

const SelectedFilters = ({
  // selectedTags,
  // setSelectedTags,
  maxNumIngredients,
  setMaxNumIngredients,
  maxTotalTime,
  setMaxTotalTime,
  maxNumServings,
  setMaxNumServings
}) => {
  if (!maxNumIngredients && !maxTotalTime && !maxNumServings) {
    return null
  }

  return (
    <div className='flex flex-wrap items-center gap-3 my-4'>
      {maxNumIngredients > 0 ? (
        <Pill onClear={() => setMaxNumIngredients(0)}>
          {maxNumIngredients} ingredients or less
        </Pill>
      ) : null}
      {maxTotalTime > 0 ? (
        <Pill onClear={() => setMaxTotalTime(0)}>
          {maxTotalTime} minutes or less
        </Pill>
      ) : null}
      {maxNumServings > 0 ? (
        <Pill onClear={() => setMaxNumServings(0)}>
          {maxNumServings} servings or less
        </Pill>
      ) : null}
    </div>
  )
}

export default SelectedFilters
