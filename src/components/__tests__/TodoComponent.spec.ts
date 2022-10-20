import { beforeEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import TodoComponent from '@/components/TodoComponent.vue'


describe('TodoComponent', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it('renders properly', () => {
        const now = new Date()
        const wrapper = mount(TodoComponent, {
            props:
            {
                todo: {
                    id: 1000,
                    title: 'Feed the cat',
                    dateCreated: now, dateCompleted: null
                }
            }
        }
        )
        expect(wrapper.text()).toContain('Feed the cat')
    })
})
