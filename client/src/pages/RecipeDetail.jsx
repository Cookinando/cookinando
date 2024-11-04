import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../services/postService';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';

const RecipeDetail = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!isAuthenticated) return;
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, isAuthenticated]);

  const handleEditButton = () => navigate(`/recipe/${id}/edit`);

  const handleDeleteButton = async () => {
    if (confirm('¿Estas seguro de que quieres eliminar esta receta?')) {
      try {
        await deletePost(id);
        console.log('Post deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) return <div className='text-light'>Cargando...</div>;

  if (!isAuthenticated) {
    return (
      <div className='bg-light text-dark w-5/6 mx-auto p-4 text-xl text-center'>
        <p>Debes <Link to='/login' className='font-bold hover:underline'>iniciar sesión</Link> o <Link to='/signup' className='font-bold hover:underline'>registrarte</Link> para poder ver este contenido</p>
      </div>
    );
  }

  if (!post) return <div>No se encontró la receta.</div>;

  return (
    <div className='w-5/6 mx-auto'>
      <h2 className='text-light-dark font-semibold text-7xl text-center my-6 max-md:text-6xl'>{post.title}</h2>
      <div className={`bg-light text-dark ${post.imageUrl ? 'mt-80' : 'mt-20'} pb-16 flex flex-col gap-8`}>
        {post.imageUrl && (
          <div className='text-light -mt-64 mr-0 max-w-full h-[450px] self-end'>
            <img src={post.imageUrl} alt={post.title} className='object-cover object-center shadow-lg w-full h-full' />
          </div>
        )}
        <div className='px-52 mx-auto mt-10 max-lg:px-20'>
          <h3 className='text-4xl my-8 max-md:text-3xl'>Ingredientes ({post.numPeople} personas):</h3>
          <ul className='list-disc px-4'>
            {post.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3 className='text-4xl my-8 max-md:text-3xl'>Preparación:</h3>
          <ol className='list-decimal px-4'>
            {post.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
      {user?.role === 'admin' && (
        <div className='flex justify-between py-12 gap-48 max-md:gap-4 max-lg:gap-24'>
          <Button text='Editar Receta' type='button' handleClick={handleEditButton} />
          <Button text='Eliminar Receta' type='button' handleClick={handleDeleteButton} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
