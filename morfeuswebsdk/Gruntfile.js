module.exports = function(grunt) {

    var botDomain = (grunt.option('domain') != '') ? grunt.option('domain') : 'demo'
    var env = (grunt.option('env') === 'production') ? 'production' : 'development';
    
    grunt.initConfig({
        build: {
            opts: {
                mode: env,
                websdkversion: '2.5.2',
                botDomain: botDomain,
                replace: { //! by default it will js and css html) $botdomain
                    "endPoint": "demo.active.ai",
                    "botDomain": "demo.active.ai"
                },
                tags: {
                    insertChatBoxTags: {
                        options: {
                            openTag: '<!-- start template tags -->',
                            closeTag: '<!-- end template tags -->'
                        },
                        src: [
                            'tmp/websdk/templates/vendor-chatBox-templates.js',
                            'tmp/websdk/css/vendor-theme-chatbox.css',
                            'tmp/websdk/css/mb.slider.css',
                            'tmp/websdk/js/jquery.mb.slider.js',
                            'tmp/websdk/js/adaptor.js',
                            'tmp/websdk/js/bot_helpers.js',
                            'tmp/websdk/js/accountListHTML.js',
                            'tmp/websdk/js/balanceInqSingleAccount.js',
                            'tmp/websdk/js/bannerHTML.js',
                            'tmp/websdk/js/billerListHTML.js',
                            'tmp/websdk/js/billPaymentDecisionHTML.js',
                            'tmp/websdk/js/blockCardAccountListHTML.js',
                            'tmp/websdk/js/cardListHTML.js',
                            'tmp/websdk/js/ChequeBookSuccess.js',
                            'tmp/websdk/js/debitCardLimitChangeHTML.js',
                            'tmp/websdk/js/DebitCardLimitChangeSuccess.js',
                            'tmp/websdk/js/downloadChatHTML.js',
                            'tmp/websdk/js/fundTransferSuccessHtml.js',
                            'tmp/websdk/js/payeeCategoryListHTML.js',
                            'tmp/websdk/js/payeeListHTML.js',
                            'tmp/websdk/js/rechargeCategoryListHTML.js',
                            'tmp/websdk/js/rechargeServiceProviderListHTML.js',
                            'tmp/websdk/js/rechargeSuccessHTML.js',
                            'tmp/websdk/js/billerCategoryListHTML.js'
                        ],
                        dest: 'tmp/websdk/chatBox.html'
                    },
                    insertChatButtonTags: {
                        options: {
                            openTag: '<!-- start template tags -->',
                            closeTag: '<!-- end template tags -->'
                        },
                        src: [
                            'tmp/websdk/templates/vendor-chatButton-templates.js',
                            'tmp/websdk/css/vendor-theme-chatbutton.css'
                        ],
                        dest: 'tmp/websdk/chatButton.html'
                    }
        
                },
                handlebarsOptions: {}, //! For future
                copyOptions: {}, //! For future
                test: {},
                deploy: {}
            }
        }
    });

    // !! This loads the plugin into grunt
    grunt.loadNpmTasks('grunt-corewebsdk-build');

    
    grunt.registerTask('default', ['build']);
};
