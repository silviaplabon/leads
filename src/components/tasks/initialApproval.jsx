/* eslint-disable react/prop-types */
import dayjs from 'dayjs'
import CustomAutoComplete from '../UI/Input/customAutoComplete.jsx'
import CustomInput from '../UI/Input/customInput.jsx'
import { useSelector } from 'react-redux'
import { checkSalaryRange } from '../../utils/util.jsx'

const InitialApproval = ({
  handleLov,
  clearErrors,
  control,
  errors,
  setValue,
  inputFieldCommonParams,
  GridSize,
  taskDecision,
  setTaskDecision,
  taskNumber,
  reqDetails,
  salaryData,
}) => {
  const lovData = useSelector((state) => state.lov)
  const tasksValues = {
    1: {
      lovKey: 'HOD_DECISION',
      decisionLovValueKeyName: 'hodLov',
    },
    2: {
      lovKey: 'HR_DECISION',
      decisionLovValueKeyName: 'hrLov',
    },
    3: {
      lovKey: 'FINAL_DECISION',
      decisionLovValueKeyName: 'cmoLov',
    },
    '0L': {
      lovKey: 'HOD_DECISION',
      decisionLovValueKeyName: 'hodLov',
    },
    '0F': {
      lovKey: 'HOD_DECISION',
      decisionLovValueKeyName: 'hodLov',
    },
  }

  return (
    <>
      <CustomAutoComplete
        height={25}
        getLovData={async () => {
          if (
            lovData[tasksValues[taskNumber]?.decisionLovValueKeyName] &&
            lovData[tasksValues[taskNumber].decisionLovValueKeyName]?.lov?.length > 0
          ) {
            return lovData[tasksValues[taskNumber].decisionLovValueKeyName]
          } else {
            return await handleLov(tasksValues[taskNumber]['lovKey'])
          }
        }}
        handleOnSearch={() => {}}
        handleSelection={(val1, val2) => {
          setTaskDecision(val2?.data?.meaning)

          if (!val2?.data?.meaning?.includes('Accept')) {
            setValue('lastWorkDate', '')
          } else {
            setValue(
              'lastWorkDate',
              reqDetails?.lastWorkDate
                ? dayjs(reqDetails.lastWorkDate, 'DD-MM-YYYY')
                : reqDetails?.conLastDate
                  ? dayjs(reqDetails.conLastDate, 'DD-MM-YYYY')
                  : '',
            )
          }

          if (taskDecision && taskDecision != val2?.data?.meaning) {
            setValue('actorRemarks', '')
            setValue('lwdEmailTrig', '')
            setValue('lwdEmailTrigLabel', '')
          }
          clearErrors('actorDecision')
        }}
        labelName={'Decision'}
        codeKey={'actorDecisionId'}
        name={'actorDecision'}
        control={control}
        isRequired={true}
        errors={errors}
        errorText={`Please Select Decision`}
        setValue={setValue}
        gridSize={GridSize}
        hideErrorMessageContainer={true}
        {...inputFieldCommonParams}
      ></CustomAutoComplete>
      {(taskNumber == 2 &&
        salaryData?.grossSalary &&
        salaryData?.grossSalary < checkSalaryRange(reqDetails) &&
        !reqDetails?.lastWorkDate &&
        taskDecision &&
        taskDecision?.toLowerCase()?.includes('accept')) ||
      (taskNumber != 2 && !taskDecision?.toLowerCase()?.includes('retain')) ? (
        <CustomInput
          labelName='Specified Last Date'
          name={'lastWorkDate'}
          inputType='Date'
          errorText={'Specified Last Working Date must have some values'}
          control={control}
          errors={errors}
          hideErrorMessageContainer={true}
          setValue={setValue}
          {...inputFieldCommonParams}
          isRequired={true}
          handleOnChange={(value) => {
            if (value) {
              clearErrors('lastWorkDate')
            }
          }}
          gridSize={GridSize}
        />
      ) : (
        <></>
      )}
      {taskNumber == 2 &&
        salaryData?.grossSalary &&
        salaryData?.grossSalary < checkSalaryRange(reqDetails) &&
        taskDecision &&
        taskDecision?.toLowerCase()?.includes('accept') && (
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
        name={'actorRemarks'}
        inputType='TextArea'
        minRows={4}
        maxRows={4}
        errorText={'Feedback/Recommendation must have some values'}
        control={control}
        errors={errors}
        setValue={setValue}
        {...inputFieldCommonParams}
        handleOnChange={(value) => {
          if (value?.length > 0) {
            clearErrors('actorRemarks')
          }
        }}
        hideErrorMessageContainer={true}
        gridSize={GridSize}
      />
    </>
  )
}
export default InitialApproval
