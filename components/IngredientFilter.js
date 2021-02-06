import Checkbox from './shared/Checkbox'

const IngredientFilter = ({ maxNumIngredients, setMaxNumIngredients }) => {
  const options = [
    { max: 0, label: 'Any', id: 'any', checked: !maxNumIngredients },
    {
      max: 5,
      label: '5 or less',
      id: '5-or-less',
      checked: maxNumIngredients === 5
    },
    {
      max: 10,
      label: '10 or less',
      id: '10-or-less',
      checked: maxNumIngredients === 10
    }
  ]
  return (
    <div>
      <h3>Ingredients</h3>
      <div className='flex flex-col'>
        {options.map(({ max, label, id, checked }) => (
          <Checkbox
            key={id}
            label={label}
            id={id}
            checked={checked}
            onHandleCheck={() => setMaxNumIngredients(max)}
          />
        ))}
      </div>
    </div>
  )
}

export default IngredientFilter
