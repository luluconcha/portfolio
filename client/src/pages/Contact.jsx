import {useState} from 'react'
import axios from 'axios';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      title: title,
      content: content,
    };

    console.log('Data being sent to the server:', data);

    try {
      const response = await axios.post('/api/index', {
      email: email,
      title: title,
      content: content,
    },
    // {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
      );
      console.log(response)
      // if (response.ok) {
      //   // Redirect to parent storypoint
      //   console.log('we got to line 32');
      //   // navigate(`/storypoints/${parentId}`);
      // } else {
      //   console.error('Failed to create Storypoint:', response.statusText);
      // }
    } catch (error) {
      console.error('Error creating Storypoint:', error);
    }
  };

    return (
    <div>

<form onSubmit={handleSubmit}>
          <div className='nes-field'>
          <label htmlFor='email_field'>
            from:
            <p id="instructions"> (your email address) </p>
            <input type="text" id="email_field" className='nes-input is-dark' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          </div>
          <br />
          <div className='nes-field'>
          <label htmlFor='subject_field'>
            subject
            <p id="instructions"> (optional) </p>
            <input type="text" id="subject_field" className='nes-input is-dark' value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          </div>
          <br />
          <label htmlFor='textarea_field'>
            Content:
            <p id="instructions"> (it's your turn to talk now) </p>
            <textarea id='textarea_field' className='nes-textarea is-dark' row="4" cols="50" value={content} onChange={(e) => setContent(e.target.value)} />
          </label>
          <br /> <br />
          
          <br /><br />
          <button type="submit" className='nes-btn'>send me an email!</button>
          {/* <button id="backButton" type="button" className="nes-btn"
           onClick={() => navigate(-1)}>
          Back
        </button> */}

        <p id="instructions"> if all goes well, this mail will be sent from your account through nodemailer</p>
        </form>
    </div>
  )
}
