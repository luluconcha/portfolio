import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel'

import Card from 'react-bootstrap/Card'


export default function Projects() {
  const [wait, setWait] = useState(true)
  const [featured, setFeatured] = useState([])
  const [data, setData] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  function handleShow(e){
    setShow(true);
    console.log(e)
    console.log(data)
    // console.log(storymap)

  }

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
     <Container>
     <Row xs={2} md={4} lg={6} className="projects-row">
        {data && data.map((e) => {
                    if (e.first) {
                        return <Card className="projects-cards" key={`${e.id}`} onClick={() => handleClick(e.tag)}>
                                <Card.Img src={`${e.url}`} id="projects-img"/>
                                <Card.Text> {e.tag}</Card.Text>    
                        </Card>

                        if (e.url.startsWith('http')) {
                            return <Col sm value={`${e.tag}`}> 
                                    <Card>
                                    <iframe
                                        id="projects-video"
                                        src={`${e.url}`}
                                        credentialsless={true}
                                        frameborder="0"
                                        allowfullscreen={false}>
                                    </iframe>
                                        </Card>
                                </Col>
                        } else {
                            return <Col sm value={`${e.tag}`}> <Card src={`${e.url}`} id="projects-img" ></Card> </Col>
                        }
                    }})
            }
        </Row> 
        </Container>          
       
 
       <>
       {/* <Button variant="primary" value="crystalball" onClick={handleShow} className="projects-button">
            big button eh
      </Button> */}

      <Modal show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
        <Modal.Header closeButton id="projects-modal">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body id="projects-modal">
         
             {featured && featured.map((f) => f.title)}
                </Modal.Body>
        <Modal.Footer id="projects-modal">

          <Button variant="primary" onClick={handleClose} className="projects-button">
            close
          </Button>
        </Modal.Footer>
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
