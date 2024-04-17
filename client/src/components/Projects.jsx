import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'


export default function Projects() {
  const [wait, setWait] = useState(true)
  const [featured, setFeatured] = useState([])
  const [data, setData] = useState([])
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);


  const handleClose = () => setShow(false);

  async function handleClick(clickedTag) {
    setWait(true)
    try {
        setFeatured(data.filter((e) => e.tag === clickedTag))
    } catch (err) {
        console.log("error setting featured imgs" + err.message)
    } finally {
        setWait(false)
        setShow(true)
    }
    
    
  }
  useEffect(() => {
    getDetails()
  }, [])

  async function getDetails(){
    setWait(true)
    try {
        const response = await axios.get('/api/projects')
        const data = await response.data
        setData(data.map((e) => { return {...e, id: crypto.randomUUID()}}))
    } catch (err) {
        console.log("error fetching data: " + err.message)
    }
   
    setWait(false)
  }
  



    return (
    <div className="projects-section">
    { wait ? "wait..." : data && <Container>
        <Row xs={2} md={4} lg={6} className="projects-row">
            {data && data.map((e) => {
                        if (e.first) {
                            return <Card className="projects-cards" key={`${e.id}`} onClick={() => handleClick(e.tag)}>
                                        <Card.Img src={`${e.url}`} variant="top" id="projects-img"/>
                                    <Card.Text> {e.tag}</Card.Text>    
                            </Card>
                        }})
                }
            </Row> 
        </Container>}     
       
 
       <>
      <Modal show={show}
            onHide={handleClose}
            dialogClassName="modal-window"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
        <Carousel>   
            {wait ? "wait..." : featured && featured.map((f) => {
                return <Carousel.Item key={`${f.id}`} interval="10000">
                    <Modal.Header id="projects-modal">
                        <Modal.Title>{f.title}</Modal.Title>
                        <Button variant="primary" onClick={handleClose} className="projects-button"><br />
                            close
                            </Button>
                    </Modal.Header>
                    <Modal.Body id="projects-modal">
                        {f.type === "img"
                            ? <Image src={`${f.url}`} alt={`${f.title}`} id="img-modal"></Image>
                                : (f.type === "video" && f.url.startsWith('./'))
                                    ? <video
                                        controls
                                        width="100%"
                                        poster={`${f.link}`}
                                        id="video-modal"
                                        title={`${f.title}`}
                                        src={`${f.url}`}>
                                        {/* <source src={`${f.url}`}
                                        type="video/mp4"/> */}
                                        <a href={`${f.url}`}></a>
                                        It seems this video is not working, sorry!
                                    </video>
                                : (f.url.startsWith('http'))
                                    ? <iframe id="video-modal"
                                        src={`${f.url}`}
                                        title={`${f.title}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        muted
                                        allowFullScreen>
                                        It seems this video is not working, sorry!
                                    </iframe>
                                : "oops! something went wrong..."}
                         <p id="projects-description">{f.description}</p>
                    </Modal.Body>
                    <Modal.Footer id="projects-modal">
                    
                    {f.link ? <p id="instructions"> click here to know more </p> : ""}
                        
                        </Modal.Footer>
                    </Carousel.Item>
            })}
        </Carousel>      
        </Modal>
       </> 
    </div>
  )
}
