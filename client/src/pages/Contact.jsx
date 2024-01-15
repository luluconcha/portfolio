import {useState} from 'react'
import axios from 'axios';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('')
  
  async function handleSubmit(e) {
    e.preventDefault()
      try {
        const response = await axios.post('/api/index', {
        email: email,
        title: title,
        content: content,
      });
      response.status === 201 ? setMessage("message was sent succesfully! I'll get back to you asap") : setMessage("it seems there was an error somewhere, please try again") 

      } catch (error) {
        console.error('error sending email: ', error);
      }
  };

    return (
    <div className='contact-page'>
<p className="contact-intro">let's get in touch!
I'd love to collaborate on something, find out about work opportunities, or just chat :) </p>
<form onSubmit={handleSubmit}>
  <div> 
          <div className='instruction-contact'>
            <label htmlFor='email_field'>
              from: {" "}
             <input type="text"
             id="email_field"
             className='contact-input'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             onClick={() => setMessage("enter your email address")}
             required={true}/>
          </label>
          </div>
  
          <div className='instruction-contact'>
          <label htmlFor='subject_field'>
            about: {" "}
              <input type="text"
              id="subject_field"
              className='contact-input'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={() => setMessage("you know, a subject line")}/>
           </label>
          </div>

        <div className='instruction-contact'>
          <label htmlFor='textarea_field'>
            <br />
              <textarea id='textarea_field'
              className='contact-input'
              value={content}
              rows="20"
              cols="50"
              onChange={(e) => setContent(e.target.value)}
              onClick={() => setMessage("it's your turn to talk!")}
              required={true}/>
          </label>
        </div>
          <br /><br />
          <button type="submit" className='send-email-button'>SEND</button> <br />
          <p id="instructions">
          {message && message}
          </p>

        <p id="instructions"> </p>
        </div>
        </form>
        
    </div>
    
  )
}
