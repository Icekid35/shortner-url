const menuicon=document.getElementsByClassName('menuicon')[0]
const menu=  document.querySelector('.menu')

menuicon.addEventListener('click',(e)=>{
  menu.style.display=  menu.style.display !='flex' ? 'flex' :'none'

})

var form=document.querySelector('form')
var invalid=document.querySelector('.invalid')


form.addEventListener('submit',(e)=>{
  e.preventDefault()
  if (e.target.value && !e.target.value.includes('.')) {
    invalid.style.display='block'
    return
  }
  fetch(`https://api.shrtco.de/v2/shorten?url=${e.target.link.value}`).then((res)=>{
   
    return res.json()
  }).then(res=>{
    res=res.result
   addlink(res.original_link,res.full_short_link2)
}).catch(err=>{
      invalid.textContent='an unexpected error occured please try again'

      invalid.style.display='block'

})
})

form.link.addEventListener('input',(e)=>{
  if (invalid.textContent!='please add a valid link') {
    invalid.textContent='please add a valid link'
  }
  if(!e.target.value.includes('.')){
      invalid.style.display='block'
e.target.classList.add('inputinvalid')
  }else{
  invalid.style.display='none'
  e.target.classList.remove('inputinvalid')

}
})

function listen(){
var copybtn=document.querySelectorAll('.copybtn')

copybtn.forEach(ele=>{
  
  ele.addEventListener('click',(e)=>{
 
    navigator.clipboard.writeText(e.target.dataset.link)
    e.target.style.background=" hsl(257, 27%, 26%)"
    
    setTimeout(()=>{
      e.target.style.background=''
    },2000)
  })
})
}
var links=document.querySelector('.links')
var processed=[]
function addlink(old, modified){
  processed.push( {old,modified})
  // localStorage.setItem('processed',JSON.stringify(processed))
  localStorage.setItem('processed','')
  var elem=document.createElement('div')
  elem.className='link'
  elem.innerHTML= `
       <span class="old">
         ${old}
       </span>
       <span class="modified">
         <a href=${modified} class="new">
            ${modified}
         </a>
      <button class="copybtn" data-link=${modified} >
           copy
         </button>
       </span>
`
  
  links.append(elem)
  listen()
}


function getoldlinks(){
  
var local=  localStorage.getItem('processed')

if(!local)return
var refined=JSON.parse(local)
refined.forEach(received=>{
  

addlink(received.old,received.modified)
})
}
getoldlinks()
