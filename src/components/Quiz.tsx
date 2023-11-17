import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
const Quiz = () => {
    const [answer, setAnswer] = useState('');
    const [error, setError ] = useState(null);
    const [ status, setStatus ] = useState('typing');
    // state for moving cursor
    const [ position, setPosition ] = useState({ x:0, y:0 });

    //message for correct answer
    if(status === 'correct'){
       return(       
        <h4>
             Congratulations, your answer is correct.
        </h4>
    )
    } 
// function for handling submit
    const  handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Submiting');
        try{
            await submitForm(answer);
            setStatus('correct')
        } catch(err:any){
            setStatus('Submiting');
            setError(err);
        }

    }
    // for collecting the answer from the text area
    const handleAnswer = (e:any) => {
        setAnswer(e.target.value)
    };
  return (
    <MainLayout>
        <div>
            <h2>Quiz Question</h2>
            <p>what city has a billboard for extracting water from air?</p>
            <form onSubmit={handleSubmit}>
                <textarea className=" border-2 outline-none ps-2 cursor-not-allowed border-zinc-200 rounded-md " value={answer} onChange={handleAnswer} disabled={status == 'submiting'} placeholder='Enter answer here!!' ></textarea>
                <button disabled={answer.length == 0 || status == 'submiting'} >Submit</button>
            </form>
            {
                error != null && <p className='px-3 py-2 text-red-400 border border-red-3'>{error.message}</p>
            }
            <div style={{ transform: `translate(${position.x}px, ${Math.min(position.y, window.innerHeight - 50)}px)`}} className='border-2 border-zinc-200 w-[50px] h-[50px] '
             onPointerMove={(e) => {                
                console.log('ClientX', e.clientX);
                console.log('ClientY', e.clientY);
             
             setPosition({              
                x: e.clientX, y: e.clientY
            })}}>
                <h2>hello world</h2>
            </div>
        </div>
    </MainLayout>
  )  
}
function submitForm(answer: string){
    return new Promise ((resolve:any, reject) => {
        setTimeout(() => {
            let quizAnswer = answer.toLowerCase() !== 'lima';
            if(quizAnswer){
                reject(new Error('Nice try, maybe next time!!'))
            }else{
                resolve();
            }
        }, 1500);
    });
};

export default Quiz