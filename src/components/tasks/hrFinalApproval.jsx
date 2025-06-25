/* eslint-disable react/prop-types */
import CustomAutoComplete from '../UI/Input/customAutoComplete.jsx'
import CustomInput from '../UI/Input/customInput.jsx'
const HRFinalApproval = ({
  clearErrors,
  control,
  errors,
  setValue,
  inputFieldCommonParams,
  GridSize,
  taskDecision,
}) => {
  return (
    <>
      {!taskDecision?.toLowerCase()?.includes('retain') && (
        <CustomInput
          labelName='Specified Last Date'
          name='lastWorkDate'
          inputType='Date'
          errorText={'Specified Last Working Date must have some values'}
          control={control}
          errors={errors}
          setValue={setValue}
          {...inputFieldCommonParams}
          handleOnChange={(value) => {
            if (value) {
              clearErrors('lastWorkDate')
            }
          }}
          hideErrorMessageContainer={true}
          gridSize={GridSize}
        />
      )}
      {!taskDecision?.toLowerCase()?.includes('retain') && (
        <CustomAutoComplete
          height={25}
          getLovData={async () => {
            return {
              lov: [
                { value: 'Y', label: 'Yes' },
                { value: 'N', label: 'No' },
              ],
            }
          }}
          handleOnSearch={() => {}}
          handleSelection={() => {
            clearErrors('lwdEmailTrig')
            clearErrors('lwdEmailTrigLabel')
          }}
          labelName={'LWD Email to be sent to emp.?'}
          placeholderText={``}
          codeKey='lwdEmailTrig'
          isCharacterLimitedSearch={false}
          name={'lwdEmailTrigLabel'}
          control={control}
          isRequired={true}
          errors={errors}
          errorText={`Please Select LWD Email To Be Sent To Employee.`}
          setValue={setValue}
          isModalField={true}
          gridSize={GridSize}
          isWithController={true}
          hideErrorMessageContainer={true}
        ></CustomAutoComplete>
      )}

      <CustomInput
        labelName='Feedback'
        name='actorRemarks'
        inputType='TextArea'
        minRows={3}
        maxRows={3}
        errorText={'Feedback/Recommendation must have some values'}
        control={control}
        errors={errors}
        gridSize={GridSize}
        setValue={setValue}
        {...inputFieldCommonParams}
        handleOnChange={(value) => {
          if (value?.length > 0) {
            clearErrors('actorRemarks')
          }
        }}
        hideErrorMessageContainer={true}
      />
    </>
  )
}
export default HRFinalApproval
