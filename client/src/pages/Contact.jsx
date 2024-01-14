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
<p>let's get in touch! I'd love to collaborate on something, or maybe, work for you. send me an email! </p>
<form onSubmit={handleSubmit}>
          <div className='instruction-contact'>
            <label htmlFor='email_field'>
              from:
                <p id="instructions"> (your email address) </p>
             <input type="text" id="email_field" className='contact-form' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
          </label>
          </div>
  
          <div className='instruction-contact'>
          <label htmlFor='subject_field'>
            subject
              <p id="instructions"> (optional) </p>
              <input type="text" id="subject_field" className='contact-form' value={title} onChange={(e) => setTitle(e.target.value)} />
           </label>
          </div>

          <label htmlFor='textarea_field'>
            Content:
              <p id="instructions"> (it's your turn to talk now) </p>
              <textarea id='textarea_field' className='contact-form' row="14" cols="50" value={content} onChange={(e) => setContent(e.target.value)} required={true}/>
          </label>
        
          <br /><br />
          <button type="submit" className='send-email-button'>SEND</button> <br />
          <p id="instructions">
          {message ? message : "if all goes well, this mail will be sent from your account through nodemailer"}
          </p>

        <p id="instructions"> </p>
        </form>
    </div>
  )
}
