import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { GET_FILM, GET_FILM_BY_ID } from '../query';
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client';
import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Home() {
  const { loading, error, data } = useQuery(GET_FILM);
  const [id, setId] = useState();
  const [
    filmById,
    { loading: loadingSingle, error: errorSingle, data: dataSingle },
  ] = useLazyQuery(GET_FILM_BY_ID, {
    variables: { filmId: id },
  });
  const [show, setShow] = useState(false);
  // console.log('data', data, loading, id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apolloClient = useApolloClient();
  /* useEffect(() => {
    const cachedData = apolloClient.readQuery({ query: GET_FILM });

    const writeCache = apolloClient.writeQuery({
      query: GET_FILM,
      data: {
        allFilms: {
          films: [
            ...data?.allFilms?.films,
            {
              __typename: 'Film',
              id: '69',
              title: 'A New Hope for getting 69',
              director: 'Johnny Bhai',
              releaseDate: '1977-05-25',
            },
          ],
        },
      },
    });
    console.log('cachedData', cachedData, data);
  }, []); */

  return (
    <div className={styles.container}>
      <Head>
        <title>GraphQl Demo</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to GraphQL demo!!</h1>

        <div className={styles.grid}>
          {!loading && data?.allFilms?.films?.length > 0 ? (
            data?.allFilms?.films.map((data, id) => (
              <Fragment key={id}>
                <a
                  className={`${styles.card} card px-3 bg-transparent border rounded c-pointer`}
                  onClick={() => {
                    setId(data.id);
                    filmById({ variables: { filmId: data.id } });
                    handleShow();
                  }}
                >
                  <div className='d-flex flex-column'>
                    <h2 className='flex-grow-1'>{data.title}</h2>
                    <p className='flex-grow-1'>{`Directed by ${data.director},`}</p>
                    <p className='mt-2'>{`It will be released to your near cinema hall on ${data.releaseDate}`}</p>
                  </div>
                </a>
              </Fragment>
            ))
          ) : (
            <>
              <a
                className={`${styles.card} card px-3 bg-transparent border rounded`}
              >
                <div className='d-flex flex-column '>
                  <h2 className='skeleton skeleton-text'></h2>
                  <p className='skeleton skeleton-text-sub-title'></p>
                  <p className='mt-2 skeleton skeleton-text-description'></p>
                </div>
              </a>
              <a
                className={`${styles.card} card px-3 bg-transparent border rounded`}
              >
                <div className='d-flex flex-column '>
                  <h2 className='skeleton skeleton-text'></h2>
                  <p className='skeleton skeleton-text-sub-title'></p>
                  <p className='mt-2 skeleton skeleton-text-description'></p>
                </div>
              </a>
              <a
                className={`${styles.card} card px-3 bg-transparent border rounded`}
              >
                <div className='d-flex flex-column '>
                  <h2 className='skeleton skeleton-text'></h2>
                  <p className='skeleton skeleton-text-sub-title-big'></p>
                  <p className='mt-2 skeleton skeleton-text-description'></p>
                </div>
              </a>
              <a
                className={`${styles.card} card px-3 bg-transparent border rounded`}
              >
                <div className='d-flex flex-column '>
                  <h2 className='skeleton skeleton-text'></h2>
                  <p className='skeleton skeleton-text-sub-title'></p>
                  <p className='mt-2 skeleton skeleton-text-description'></p>
                </div>
              </a>
              <a
                className={`${styles.card} card px-3 bg-transparent border rounded`}
              >
                <div className='d-flex flex-column '>
                  <h2 className='skeleton skeleton-text'></h2>
                  <p className='skeleton skeleton-text-sub-title'></p>
                  <p className='mt-2 skeleton skeleton-text-description'></p>
                </div>
              </a>
              <a
                className={`${styles.card} card px-3 bg-transparent border rounded`}
              >
                <div className='d-flex flex-column '>
                  <h2 className='skeleton skeleton-text'></h2>
                  <p className='skeleton skeleton-text-sub-title'></p>
                  <p className='mt-2 skeleton skeleton-text-description'></p>
                </div>
              </a>
            </>
          )}
          {!loadingSingle && dataSingle?.film?.title ? (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title className='text-dark'>
                  {dataSingle?.film?.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className='text-dark'>
                {dataSingle?.film?.openingCrawl}
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title className='text-dark skeleton modal-skeleton-title'></Modal.Title>
              </Modal.Header>
              <Modal.Body className='text-dark skeleton modal-skeleton-body'></Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </main>
    </div>
  );
}
