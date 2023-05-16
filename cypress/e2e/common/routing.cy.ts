import { selectByTestId } from '../../helpers/selectByTestId';

describe('Роутинг', () => {
    describe('Пользователь не авторизован', () => {
        it('Переход на главную страницу', () => {
            // указываем относительный адресс, так как в конфиге указали полный
            cy.visit('/');
            // проверяем существование элемента на странице
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Переход открывает страницу профиля', () => {
            // указываем относительный адресс, так как в конфиге указали полный
            cy.visit('/profile/1');
            // проверяем существование элемента на странице
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Переход открывает несуществующий маршрут', () => {
            // указываем относительный адресс, так как в конфиге указали полный
            cy.visit('/sagewrgsfg');
            // проверяем существование элемента на странице
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('Пользователь авторизован', () => {
        // выносим повторяющиеся действия
        beforeEach(() => {
            cy.login('admin', '123');
        });
        it('Переход открывает страницу профиля', () => {
            // указываем относительный адресс, так как в конфиге указали полный
            cy.visit('/profile/1');
            // проверяем существование элемента на странице
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });
        it('Переход открывает страницу со списком статей', () => {
            // указываем относительный адресс, так как в конфиге указали полный
            cy.visit('/articles');
            // проверяем существование элемента на странице
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
