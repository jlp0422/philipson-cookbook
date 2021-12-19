import { useMutation } from '@apollo/client'
import Image from 'next/image'
import { useState } from 'react'
import Button from '~/components/shared/Button'
import FormArea from '~/components/shared/form/FormArea'
import FormInput from '~/components/shared/form/FormInput'
import Head from '~/components/shared/Head'
import Loading from '~/components/shared/Loading'
import CREATE_COMMENT from '~/graphql/mutations/createComment'
import RECIPE_QUERY from '~/graphql/queries/recipe'
import { createPageTitle, isLink, lower, upper } from '~/utils/helpers'

const Recipe = ({ recipeId, data, loading, error }) => {
  const [comment, setComment] = useState({ text: '', author: '' })
  const [errors, setErrors] = useState({})
  const [showAddComment, setShowAddComment] = useState(false)
  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: RECIPE_QUERY, variables: { id: recipeId } }],
    onCompleted: () => setComment({ text: '', author: '' })
  })

  if (loading) {
    return <Loading modifier='orange' size='large' styles='mt-16' />
  }

  if (error) {
    return <h3>Something went wrong: {JSON.stringify(error, null, 2)}</h3>
  }

  if (!data.findRecipeByID) {
    return <h3>No recipe found!</h3>
  }

  const validateComment = comment => {
    const commentFormErrors = {}
    if (!comment.author) {
      commentFormErrors['author'] = {
        short: 'Author missing',
        long: 'Please add a comment author.'
      }
    }
    if (!comment.text) {
      commentFormErrors['text'] = {
        short: 'Text missing',
        long: 'Please add a comment.'
      }
    }
    return commentFormErrors
  }

  const onSubmitComment = ev => {
    ev.preventDefault()
    const formErrors = validateComment(comment)
    if (Object.keys(formErrors).length) {
      setErrors(formErrors)
    } else {
      createComment({
        variables: {
          commentInput: {
            ...comment,
            recipe: { connect: recipeId }
          }
        }
      })
    }
  }

  const onChangeComment = key => ev => {
    setComment({
      ...comment,
      [key]: ev.target.value
    })
  }

  const { findRecipeByID: recipe } = data

  return (
    <>
      <Head title={createPageTitle(recipe.title)} />
      <section className='mx-auto text-gray-700 body-font'>
        <div className='container flex flex-col items-center px-5 py-8 pt-0 mx-auto sm:py-8 lg:px-20 md:flex-row'>
          <div className='flex flex-col items-center w-full pt-0 mb-16 text-left lg:flex-grow lg:mr-16 lg:pr-18 md:pr-12 md:items-start md:text-left md:mb-0 lg:text-center'>
            <h2 className='mb-1 text-xs font-medium tracking-wider text-blue-500 title-font'>
              {recipe.tags.map(upper).join(', ')}
            </h2>
            <h1 className='mb-8 text-3xl font-bold tracking-tighter text-center text-blue-800 lg:text-left lg:text-5xl title-font'>
              {recipe.title}
            </h1>
            <p className='mb-8 text-base leading-relaxed text-center text-gray-700 md:text-left lg:text-1xl'>
              {recipe.description}
            </p>
            <div className='flex justify-center'>
              <p className='inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0'>
                Submitted by: {recipe.author}
              </p>
            </div>
          </div>
          <div className='w-5/6 lg:max-w-lg lg:w-full md:w-1/2'>
            <Image
              className='object-cover object-center rounded-lg'
              alt='hero'
              src={recipe.imageUrl}
              width={720}
              height={600}
            />
          </div>
        </div>
        <div className='recipe-flex-wrapper'>
          <div className='recipe-section'>
            <h3 className='recipe-section-header'>Ingredients</h3>
            {recipe.ingredients.data.map(({ amount, item, measurement }) => (
              <p className='py-1' key={item}>
                {amount} {lower(measurement)} {item}
              </p>
            ))}
          </div>
          <div className='recipe-section'>
            <h3 className='recipe-section-header'>Steps</h3>
            {recipe.steps.map((step, index) => (
              <p className='py-1' key={index}>
                {`${index + 1}) ${step}`}
              </p>
            ))}
          </div>
        </div>
        <div className='recipe-flex-wrapper'>
          <div className='recipe-section'>
            <h3 className='recipe-section-header'>Notes</h3>
            <p>{recipe.notes}</p>
          </div>
          {recipe.source ? (
            <div className='recipe-section'>
              <h3 className='recipe-section-header'>Source</h3>
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
        <div className='recipe-flex-wrapper'>
          <div className='recipe-section md:w-full'>
            <h3 className='recipe-section-header'>Comments</h3>
            {recipe.comments.data.length ? (
              recipe.comments.data.map((comment, index) => (
                <div
                  key={index}
                  className='w-full p-3 my-2 border-2 border-gray-300 border-solid rounded-md'
                >
                  <p>{comment.text}</p>
                  <p className='text-sm italic'>
                    &ndash;&nbsp;{comment.author}
                  </p>
                </div>
              ))
            ) : (
              <div className='text-center sm:text-left'>
                <p>No comments yet, be the first!</p>
                {!showAddComment && (
                  <Button
                    className='py-2 my-2'
                    color='blue'
                    onClick={() => setShowAddComment(true)}
                  >
                    Add comment
                  </Button>
                )}
              </div>
            )}
            {showAddComment && (
              <form className='w-full mt-4' onSubmit={onSubmitComment}>
                <FormArea
                  label='Comment'
                  id='text'
                  value={comment.text}
                  onChange={onChangeComment('text')}
                  rows='3'
                  placeholder="This was the best dish I've ever eaten!"
                  labelStyles='mt-2'
                  error={errors['text']}
                />
                <FormInput
                  label='Name'
                  id='author'
                  value={comment.author}
                  onChange={onChangeComment('author')}
                  labelStyles='mt-2'
                  placeholder='Bobby Flay'
                  error={errors['author']}
                />
                <Button className='py-2 my-4' color='green' type='submit'>
                  Save comment
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Recipe
