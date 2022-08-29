var express=require("express");
var router=express.Router();

const credential={
    email:'rahulps995@gmail.com',
    password:"123456"
}
var loggedOut = false;
var invalidId = false;
//log in user

router.get('/',authorise,(req,res)=>{   
    if(loggedOut){
        res.render('base',{logout:'logout successfully'})
        // console.log("------------loggedout--------------",req.session.loggedOut)
        loggedOut=false;
        invalidId = false;
    } else if(invalidId){      
        res.render('base',{title:true})
        
    }else{
      
        res.render('base')
    }    
 });

router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/dashboard');
    }else{ 
      res.render('base',{title:'ckeck password error show'})
      //  res.redirect('/')
        

    } 
});

//router for dashboard

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        let products = [
          {
            name: "Iphone 13",
            category: "apple",
            discription: "High performance Premium ",
            
            img: "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/katariy/catpage/xcm_banners_iphone-13_72990_580x800_in-en.jpg",
          },
          {
            name: "A54",
            category: "Oppo",
            discription: "High speed ",
            img: "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/katariy/catpage/xcm_banners_x60-urwdm-z37su-fjqj8-revised_580x800_in-en.jpg",
          },
            {
              name: "Camon 19",
              category: "Tecno",
              discription: "",
              img: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/Tiles/BAU/xcm_banners_tecno-8c-1-ulflf-3r5t9-2xdiisz9909_580x800_in-en.jpg",
            },
            {
              name: "Y21G",
              category: "VIVO",
              discription: "High speed ",
              img: "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/katariy/catpage/xcm_banners_y73-8ttc8_580x800_in-en.jpg",
            },
            {
              name: "Lava",
              category: "Agni 5G",
              discription: "High performance",
              img: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/Zimrane/March22/xcm_banners_lava-agni-updated_580x800_in-en.jpg",
            },
            {
              name: "Tecno",
              category: "Sparc 8c",
              discription: "Medium performance",
              img: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/Tiles/NewSET/xcm_banners_tecno-8c-3_580x800_in-en.jpg",
            },
          ];
          let list = [
            {
              model: "Top seller",
            },
            {
              model: "Top Rated",
            },
            {
              model: "Latest Models",
            },
            {
              model: "Offer",
            },
          ];
      
          let table = [
            {
              no: "1",
              item: "iPhone",
              quantity: "1000",
            },
            { no: "2",
             item: "Oppo", 
             quantity: "800" },
          ];
        res.render('dashboard',{title:req.session.user,products,list,table})

    }else{
        res.send('unauthorized user')
        
    }
    // console.log('----------------true---------------',req.session.user)
});
//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){         
     if(err){
        res.send('error')
     }else{
        loggedOut=true;
        res.redirect('/')
     }
    })
})
   
function authorise(req,res,next){
    // console.timeLog('---------sucess-------')
if(req.session.user){
       return res.redirect("/dashboard")
  }else{
    
   
    next()
  }
  }

module.exports = router;

