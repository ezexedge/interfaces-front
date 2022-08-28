import React from 'react';
 
 
const Footer : React.FC = () => {
 

 
    return (
 
<footer className='footer mt-5'>

	<div className="copyright">
		<div className="container ">
			<div className="row">
				 <p>{`© Copyright ${new Date().getFullYear()} 24hs`}</p>
			</div>
		</div>
	</div>
</footer>
 
    )
    
  
 
}
 
export default Footer;