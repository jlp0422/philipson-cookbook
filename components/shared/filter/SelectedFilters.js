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
  selectedServings,
  setSelectedServings
}) => {
  if (!maxNumIngredients && !maxTotalTime && !selectedServings.length) {
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
      {selectedServings.length > 0
        ? selectedServings.sort().map(serves => (
            <Pill key={serves} onClear={() => setSelectedServings(0)}>
              {SERVING_SIZE_TO_LABEL[serves]}
            </Pill>
          ))
        : null}
    </div>
  )
}

export default SelectedFilters
