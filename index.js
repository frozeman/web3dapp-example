// create basic app
var app = new Vue({
  el: '#app',
  data: {
    version: Web3.version,
    network: null,
    currentBlock: null,
    balance: 0,
    walletAddress: null,
    myString: null,
    classes: {
        flash: false
    }
  },
  methods: {
    doSomething: function(event){
        console.log('do!');
    }
  }
});


// display current network
web3.eth.net.getNetworkType().then(function(network){
    app.network = network;
});


// display current block
web3.eth.getBlock('latest').then(function(block){
    app.currentBlock = block.number;
});

// update data at start
updateData();


// update the last block
web3.eth.subscribe('newBlockHeaders', function(err, block){
    app.currentBlock = block.number;
    app.classes.flash = true;
    setTimeout(function(){
        app.classes.flash = false;
    }, 400);

    updateData();

});

async function updateData(){
    
    // check balance
    var res = await web3.eth.getBalance('0x75F179354452774eDeB482025c1c3f87E4f5F191');
    app.balance = web3.utils.fromWei(res, 'ether');

    // update contract string
    app.myString = await contract.methods.getString().call();
}


// add wallet
//0x56253958bb35fbbc519e2cc0ee20c12d843833546f2a82254b3cc475122ac021
//0x75F179354452774eDeB482025c1c3f87E4f5F191
web3.eth.accounts.wallet.add('0x56253958bb35fbbc519e2cc0ee20c12d843833546f2a82254b3cc475122ac021');
app.walletAddress = web3.eth.accounts.wallet[0].address;




