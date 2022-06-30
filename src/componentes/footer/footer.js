import React from 'react';
 
 
class Footer extends React.Component {
 
  render() {
 
    return (
 
<footer className='footer mt-5'>

	<div class="copyright">
		<div class="container ">
			<div class="row">
				 <p>{`© Copyright ${new Date().getFullYear()} 24hs`}</p>
			</div>
		</div>
	</div>
</footer>
 
    )
    
  }
 
}
 
export default Footer;