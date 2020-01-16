self.addEventListener('install', function(){
  console.log('installing..');
})

self.addEventListener('fetch', function(event){
  console.log('sit works offline now !!')
})

self.addEventListener('beforeinstallprompt',function(event){
  event.prompt();
});
