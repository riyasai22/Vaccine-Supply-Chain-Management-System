App = {

    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: function() {
        if(window.web3) {
            App.web3Provider=window.web3.currentProvider;
        } else {
            App.web3Provider=new Web3.proviers.HttpProvider('http://localhost:8545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {

        $.getJSON('vaccine.json',function(data){
            var productArtifact=data;
            App.contracts.vaccine=TruffleContract(productArtifact);
            App.contracts.vaccine.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function() {

        $(document).on('click','.btn-register',App.registerProduct);
    },

    registerProduct: function(event) {
        event.preventDefault();

        // var productInstance;

        // var manufacturerID = document.getElementById('manufacturerID').value;
        // var productName = document.getElementById('productName').value;
        // var productSN = document.getElementById('productSN').value;
        // var productBrand = document.getElementById('productBrand').value;
        // var productPrice = document.getElementById('productPrice').value;
        // console.log(manufacturerID,productName,productSN,productBrand,productPrice)
        // //window.ethereum.enable();

        var productInstance;

        var manufacturerID = document.getElementById('manufacturerID').value;
        var manufactureAddress = document.getElementById('ManufactureAddress').value;

        // var productName = document.getElementById('productName').value;
        var productSN = document.getElementById('productSN').value;
        var productBrand = document.getElementById('productBrand').value;
        var productPrice = document.getElementById('productPrice').value;
        console.log(manufacturerID,manufactureAddress,productSN,productBrand,productPrice)

        web3.eth.getAccounts(function(error,accounts){
            console.log(web3.fromAscii(manufacturerID),web3.fromAscii(productSN),web3.fromAscii(productBrand),web3.fromAscii(productPrice))

            if(error) {
                console.log(error);
            }

            console.log(accounts);
            var account=accounts[0];
            // console.log(account);

            App.contracts.vaccine.deployed().then(function(instance){
                productInstance=instance;
                return productInstance.addProduct(web3.fromAscii(manufacturerID), web3.fromAscii(productSN), web3.fromAscii(productBrand), productPrice,web3.fromAscii(manufactureAddress) ,{from:account}); 
            }).then(function(result){
                console.log(result)
            }).then(function(instance){
                uniqueIdentifierInstance=instance;
                console.log(uniqueIdentifierInstance)
                const productId = 0; 
                const manufacturingDate = 1683087423;
                return uniqueIdentifierInstance.createIdentifier(web3.fromAscii(productSN),manufacturerID,manufacturingDate,web3.fromAscii(manufactureAddress),{from:account});

            }).then(function(result){
                console.log(result);
                return App.contracts.vaccine.deployed();
            }).then(function(instance){
                newInstance=instance;
                return instance.displayIdentifier();
            }).then(function(result){
                console.log(result);

                // console.log(receipt);
                // var events = receipt.events;
                // for (var i=0; i<events.length; i++) {
                //     var event = events[i];
                //     if (event.event == "CreatedIdentifier") {
                //       var identifier = event.returnValues.identifier;
                //       console.log("Identifier:", identifier);
                //       break;
                //     }
                //   }
                document.getElementById('manufacturerID').value='';
                document.getElementById('ManufactureAddress').value='';
                document.getElementById('productSN').value='';
                document.getElementById('productBrand').value='';
                document.getElementById('productPrice').value='';

            }).catch(function(err){
                console.log(err.message);
            });
  
        });
    }
};

$(function() {

    $(window).load(function() {
        App.init();
    })
})


// App = {

//     web3Provider: null,
//     contracts: {},

//     init: async function() {
//         return await App.initWeb3();
//     },

//     initWeb3: function() {
//         if(window.web3) {
//             App.web3Provider=window.web3.currentProvider;
//         } else {
//             App.web3Provider=new Web3.proviers.HttpProvider('http://localhost:8545');
//         }

//         web3 = new Web3(App.web3Provider);
//         return App.initContract();
//     },

//     initContract: function() {

//         $.getJSON('product.json',function(data){
//             var productArtifact=data;
//             App.contracts.vaccine=TruffleContract(productArtifact);
//             App.contracts.vaccine.setProvider(App.web3Provider);
//         });

//         return App.bindEvents();
//     },

//     bindEvents: function() {

//         $(document).on('click','.btn-register',{
//             App.registerProduct
//             App.createUniqueIdentifier
//         });
//     },

//     registerProduct: function(event) {
//         event.preventDefault();

//         var productInstance;

//         var manufacturerID = document.getElementById('manufacturerID').value;
//         var manufactureAddress = document.getElementById('ManufactureAddress').value;

//         // var productName = document.getElementById('productName').value;
//         var productSN = document.getElementById('productSN').value;
//         var productBrand = document.getElementById('productBrand').value;
//         var productPrice = document.getElementById('productPrice').value;
//         console.log(manufacturerID,manufactureAddress,productSN,productBrand,productPrice)
//         //window.ethereum.enable();
//         web3.eth.getAccounts(function(error,accounts){
//             console.log(web3.fromAscii(manufacturerID),web3.fromAscii(manufactureAddress),web3.fromAscii(productSN),web3.fromAscii(productBrand),web3.fromAscii(productPrice))

//             if(error) {
//                 console.log(error);
//             }

//             console.log(accounts);
//             var account=accounts[0];
//             App.contracts.vaccine.deployed().then(function(instance){
//                 productInstance=instance;
//                 return productInstance.addProduct(web3.fromAscii(manufacturerID),web3.fromAscii(manufactureAddress), web3.fromAscii(productSN), web3.fromAscii(productBrand), productPrice, {from:account});
//              }).then(function(result){
//                 // console.log(result);
//                 document.getElementById('manufacturerID').value='';
//                 document.getElementById('ManufactureAddress').value='';
//                 document.getElementById('productSN').value='';
//                 document.getElementById('productBrand').value='';
//                 document.getElementById('productPrice').value='';

//             }).catch(function(err){
//                 console.log(err.message);
//             });
//         });
//     }
//     createUniqueIdentifier: function(event){
//         event.preventDefault();
//         var uniqueIdentifierInstance;
//         var manufacturerID = document.getElementById('manufacturerID').value;
//         var manufactureAddress = document.getElementById('ManufactureAddress').value;
//         var productSN = document.getElementById('productSN').value;


//     }
// };

// $(function() {

//     $(window).load(function() {
//         App.init();
//     })
// })

