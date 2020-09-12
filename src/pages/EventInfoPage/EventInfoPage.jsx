import React from 'react'
import { MainTemplate } from '../../templates'
import { EventInfoStyled, Container } from './EventInfoPage.styles'
import EventInfoPageData from './EventInfoPageData.json'
import { FormField, TitleContainer } from '../../components/molecules'
import { useSelector, useDispatch } from 'react-redux'
import { updateEventAsync } from '../../redux/slices/events'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/atoms'
import { serializeEventFormData, serializeEventToFormData } from './helper'
import { useParams } from 'react-router-dom'

export function EventInfoPage() {
  const { eventId } = useParams()
  const { selectedEvent, eventsIsLoading, eventsError } = useSelector(state => {
    return {
      selectedEvent: state.events.entities[eventId] || null,
      eventsIsLoading: state.events.loading,
      eventsError: state.events.error
    }
  })

  const eventDefaultData = serializeEventToFormData(selectedEvent)

  const { handleSubmit, register } = useForm({
    defaultValues: eventDefaultData
  })

  const dispatch = useDispatch()

  function onSubmit(data) {
    const eventFormDataSerialized = serializeEventFormData(data)
    dispatch(
      updateEventAsync({
        eventInfo: eventFormDataSerialized,
        eventId
      })
    )
  }

  return (
    <MainTemplate>
      <TitleContainer>
        <h3>{EventInfoPageData.title}</h3>
        <Button onClick={handleSubmit(onSubmit)}>
          {EventInfoPageData.buttonAdd}
        </Button>
      </TitleContainer>
      <EventInfoStyled>
        <Container>
          {eventsIsLoading ? (
            <h1>Loading...</h1>
          ) : eventsError ? (
            <h1>Error</h1>
          ) : (
            EventInfoPageData.fields.map(field => (
              <FormField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                options={field.options}
                register={register}
              />
            ))
          )}
        </Container>
      </EventInfoStyled>
    </MainTemplate>
  )
}
