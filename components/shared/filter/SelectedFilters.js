import Pill from '~/components/shared/Pill'
import {
  SERVING_SIZE_TO_LABEL,
  INGREDIENTS_FILTER_ENABLED
} from '~/utils/constants'

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
      {INGREDIENTS_FILTER_ENABLED && maxNumIngredients > 0 ? (
        <Pill onClear={() => setMaxNumIngredients(0)}>
          {maxNumIngredients} ingredients or less
        </Pill>
      ) : null}
      {maxTotalTime > 0 ? (
        <Pill onClear={() => setMaxTotalTime(0)}>
          {maxTotalTime} minutes or less
        </Pill>
      ) : null}
      {maxNumServings.length > 0
        ? maxNumServings.sort().map(serves => (
            <Pill key={serves} onClear={() => setMaxNumServings(0)}>
              {SERVING_SIZE_TO_LABEL[serves]}
            </Pill>
          ))
        : null}
    </div>
  )
}

export default SelectedFilters
