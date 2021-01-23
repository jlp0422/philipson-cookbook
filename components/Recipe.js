import { useState } from 'react'
import { useRecipe } from '@/graphql/api'
import Head from '@/components/Head'
import Image from 'next/image'
import FormInput from '@/components/shared/FormInput'

const sectionContainerStyles =
  'flex flex-col items-center w-full pt-0 mb-8 text-left lg:flex-grow md:w-1/2 lg:mr-20 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0'
const sectionHeaderStyles =
  'mb-4 text-2xl font-bold tracking-tighter text-center text-blue-800 lg:text-left lg:text-4xl'
const flexWrapperStyles =
  'container flex flex-col items-start px-5 py-8 mx-auto lg:px-20 md:flex-row'

const isLink = source => source.includes('https') || source.includes('www.')

const Recipe = ({ recipeId }) => {
  const [newComment, setNewComment] = useState('')
  const { data, error, errorMessage } = useRecipe(recipeId)

  const onSubmitComment = async comment => {
    ev.preventDefault()
    const data = await createRecipe(formState)
    console.log({ data })
  }

  if (!data && !error) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h3>error!: {errorMessage}</h3>
  }

  if (!data.findRecipeByID) {
    return <h3>No recipe found!</h3>
  }

  const recipe = data.findRecipeByID
  console.log({ recipe })

  return (
    <>
      <Head title={`${recipe.title} | Philipson Cookbook`} />
      <section className='mx-auto text-gray-700 body-font'>
        <div className='container flex flex-col items-center px-5 py-8 mx-auto lg:px-20 md:flex-row'>
          <div className='flex flex-col items-center w-full pt-0 mb-16 text-left lg:flex-grow md:w-1/2 lg:mr-20 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0 lg:text-center'>
            <h2 className='mb-1 text-xs font-medium tracking-widest text-blue-500 title-font'>
              {recipe.tags.join(', ')}
            </h2>
            <h1 className='mb-8 text-3xl font-bold tracking-tighter text-center text-blue-800 lg:text-left lg:text-5xl title-font'>
              {recipe.title}
            </h1>
            <p className='mb-8 text-base leading-relaxed text-center text-gray-700 lg:text-left lg:text-1xl'>
              {recipe.description}
            </p>
            <div className='flex justify-center'>
              <p className='inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0'>
                {recipe.author}
              </p>
            </div>
          </div>
          <div className='w-5/6 lg:max-w-lg lg:w-full md:w-1/2'>
            <Image
              className='object-cover object-center rounded-lg '
              alt='hero'
              src={recipe.imageUrl}
              width={720}
              height={600}
            />
          </div>
        </div>
        <div className={flexWrapperStyles}>
          <div className={sectionContainerStyles}>
            <h3 className={sectionHeaderStyles}>Ingredients</h3>
            {recipe.ingredients.data.map(({ amount, item, measurement }) => (
              <p className='py-1' key={item}>
                {amount} {measurement.toLowerCase()} {item}
              </p>
            ))}
          </div>
          <div className={sectionContainerStyles}>
            <h3 className={sectionHeaderStyles}>Steps</h3>
            {recipe.steps.map((step, index) => (
              <p className='py-1' key={index}>
                {index + 1}) {step}
              </p>
            ))}
          </div>
        </div>
        <div className={flexWrapperStyles}>
          <div className={sectionContainerStyles}>
            <h3 className={sectionHeaderStyles}>Notes</h3>
            <p>{recipe.notes}</p>
          </div>
          {recipe.source ? (
            <div className={sectionContainerStyles}>
              <h3 className={sectionHeaderStyles}>Source</h3>
              {isLink(recipe.source) ? (
                <a
                  className='text-blue-500 hover:text-blue-700'
                  href={recipe.source}
                  target='_blank'
                >
                  {recipe.source}
                </a>
              ) : (
                <p>{recipe.source}</p>
              )}
            </div>
          ) : null}
        </div>
        <div className={flexWrapperStyles}>
          <div className={`${sectionContainerStyles} md:w-full`}>
            <h3 className={sectionHeaderStyles}>Comments</h3>
            {recipe.comments.data.length ? (
              recipe.comments.data.map((comment, index) => (
                <p key={index}>{`${comment.text} (${comment.author})`}</p>
              ))
            ) : (
              <p>No comments yet, be the first!</p>
            )}
            <FormInput
              label='New Comment'
              id='comment'
              value={newComment}
              onChange={ev => setNewComment(ev.target.value)}
              labelStyles='mt-8 w-full'
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Recipe
