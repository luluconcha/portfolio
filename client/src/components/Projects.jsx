import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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
                                        <Card.Img src={`${e.url}`} id="projects-img"/>
                                    <Card.Text> {e.tag}</Card.Text>    
                            </Card>
                        }})
                }
            </Row> 
        </Container>}     
       
 
       <>
      <Modal show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            interval={null}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {wait ? "wait..." : featured && featured.map((f) => {
                return <Carousel.Item key={`${f.id}`}>
                    <Modal.Header closeButton id="projects-modal">
                        <Modal.Title>{f.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="projects-modal">
                        {f.type === "img" ? <Image src={`${f.url}`} alt={`${f.title}`} id="img-modal"></Image>
                            : (f.type === "video" && f.url.startsWith('./'))
                                ? <video controls poster='./still_feliz_cumple.png' id="video-modal">
                                    <source src={`${f.url}`} type="video/mp4"/>
                                </video>
                            : (f.url.startsWith('http'))
                                ? <iframe id="video-modal"
                                    src={`${f.url}`}
                                    title={`${f.title}`}
                                    credentialsless={true}
                                    frameborder="0"
                                    allowfullscreen>
                                </iframe>
                            : "oops! something went wrong..."} 
                    </Modal.Body>
                    <Modal.Footer id="projects-modal">
                    <p>{f.description}</p>
                        <Button variant="primary" onClick={handleClose} className="projects-button">
                            close
                            </Button>
                        </Modal.Footer>
                    </Carousel.Item>
            })} 
        </Carousel>      
          
      </Modal>
       </> 
    
        {/* <iframe  id="crystalball-video"
            src="https://www.loom.com/embed/5bd31f44d95e4c1f9c470a1ed8700f34?sid=6f58399b-f597-4789-9a91-8beb0d1d00a5"
            credentialsless={true}
            frameborder="0" allowfullscreen={false}>
    
        </iframe> */}
        
    
    </div>
  )
}
