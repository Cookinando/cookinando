import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../services/postService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const RecipeDetail = () => {
  const auth = useAuth();
  const isAuthenticated = auth ? auth.isAuthenticated : true;
  const isAdmin = auth ? auth.isAdmin : true;

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Post de prueba para mostrar el detalle, lo quitaremos cuando tengamos el backend completo
  const postTest = {
    title: 'Noodles con gambas',
    numPeople: 4,
    ingredients: [
      '250 grs. gambas, peladas y sin cabeza',
      '2 c/s aceite',
      '2 huevos L batidos',
      '2 c/c curry de Madras, en polvo',
      '1 cebolla (100 grs.), cortada a rodajas',
      '1 pimiento largo italiano, cortado a tiras',
      '100 grs. semillas de soja (o tirabeques)',
      '3 calabacines (para noodles vegetarianos) ó 400 grs. noodles (de huevo o de arroz)',
      '4 cebolletas, cortadas en aritos',
      '2 c/s sésamo tostado'
    ],
    instructions: [
      'Mezclar todos los ingredientes de la salsa. Utilizar 2 cucharadas de ésta para marinar las gambas. Reservar.',
      'Si utilizáis la versión vegetariana, preparar los ¨spaguettis¨ de calabacín con la máquina o cortando finas lonchas y después tiras finas. Reservar.',
      'Calentar 1 cucharadita de aceite en una sartén y preparar una tortilla, que trocearemos mientras la hagamos. Reservar.',
      'Verter otra cucharadita de aceite en la misma sartén y freír las gambas 2-3 minutos, justo hasta que cambien de color. Reservar.',
      'Verter el resto del aceite y echar el curry, cocinar 30 segundos hasta que desprenda olor.',
      'Incorporar la cebolla, el pimiento, la soja o tirabeques y cocinar 2 minutos.',
      'Agregar los calabacines (*) y el resto de la salsa. Remover y cocinar 2 minutos más.',
      'Añadir la tortilla y las gambas. Probar y rectificar de sal.',
      'Servir con las cebolletas y el sésamo.'
    ],
    imageUrl: 'https://s3-alpha-sig.figma.com/img/09e3/e9e7/b1d825f6d65d8b5e61cf4da2fb5115c8?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XneqXCSqJvGJvH1EI1BZW7ZB2cFU5q1-dqWTRgzj2HZnzMdTN7FPsSA1WBTIEyZOa8VYg7B6KqNjIal0rXV6Fk9RyhagQzYa9oCl87dJ9zLWq~mZl9kkOkOMVADpxdWSYWwYPWbdIhUMm70PPJzyHDxh9Ui9cx-HABRSr3rOiOShhtHTAyKfkPehwystrl6LKOTA8Cgf4JyGgJx8NNhnaIEgvg0PWtXBn1MICM0Al09ByzW~1vpIYN2TZu2yWKxoIuEPenmHH8aipsMyRHN~cDAftiujE9OmtK5UJT6xne~ftBNeiM53JNaJLkC667iFLj0VleH~qyZCvL6s6xBdtg__',
  }


  useEffect(() => {
    if (!isAuthenticated) {
      console.log('You are not authenticated. Redirecting to login...');
    }
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(postTest); // Mostrar el post de prueba si no se encuentra el post real, lo quitaremos cuando tengamos el backend completo
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, isAuthenticated]);

  if (loading) {
    return <div className='text-light'>Cargando...</div>;
  }

  if (!post) {
    return <div>No se encontró la receta.</div>;
  }

  const handleEditButton = () => {
    navigate(`/recipe/${id}/edit`);
  };

  const handleDeleteButton = async () => {
    try {
      confirm('¿Estas seguro de que quieres eliminar esta receta?') &&
      (await deletePost(id),
      console.log('Post deleted successfully'),
      navigate('/'))
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
    {
      isAuthenticated ?
        <div className='w-5/6 mx-auto'>
          <h2 className='text-light-dark font-semibold text-7xl text-center my-6 max-md:text-6xl'>{post.title}</h2>
          <div className={`bg-light text-dark ${ post.imageUrl ? 'mt-80' : 'mt-20'} pb-16 flex flex-col gap-8`}>
              {
                post.imageUrl && (
                  <div className='text-light -mt-64 mr-0 max-w-full h-[450px] self-end'>
                    <img src={post.imageUrl} alt={post.title} className='object-cover object-center shadow-lg w-full h-full' />
                  </div>
                )
              }
            <div className='px-52 mx-auto mt-10 max-lg:px-20'>
              <h3 className='text-4xl my-8 max-md:text-3xl'>Ingredientes ({post.numPeople} personas):</h3>
              <ul className='list-disc px-4'>
                {
                  post.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                }
              </ul>
              <h3 className='text-4xl my-8 max-md:text-3xl'>Preparación:</h3>
              <ol className='list-decimal px-4'>
                {
                  post.instructions.map((instruction, index) => (
                    <li key={index} className=''>{instruction}</li>
                  ))
                }
              </ol>
            </div>
          </div>
          {
            isAdmin && (
              <div className='flex justify-between py-12 gap-48 max-md:gap-4 max-lg:gap-24'>
            <Button text='Editar Receta' type='button' handleClick={handleEditButton} />
            <Button text='Eliminar Receta' type='button' handleClick={handleDeleteButton} />
          </div>
            )
          }
        </div>
      : <div className='bg-light text-dark w-5/6 mx-auto p-4 text-xl text-center'>
          <p>Debes <Link to='/login' className='font-bold hover:underline' >iniciar sesión</Link> o <Link to='/signup' className='font-bold hover:underline' >registrarte</Link> para poder ver este contenido</p>
        </div>
    }
    </>
  )
}

export default RecipeDetail;
