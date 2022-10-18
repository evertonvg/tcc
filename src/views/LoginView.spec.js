const loginView = require('./LoginView.vue');
const vtl = require('@testing-library/vue');

const {render,screen} = vtl

it('has Login header',()=>{
    render(loginView);
    const header = screen.queryByRole('heading',{name: 'Sign Up'});
    expect(header).not.toBeNull();
})