import Pill from '~/components/shared/Pill'


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
