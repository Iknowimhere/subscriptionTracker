import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    price:{
        type: Number,
        required: [true, "Subscription price is required"],
        min: 0
    },
    currency:{
        type: String,
        enum: ['USD','EUR','GBP','INR'],
        default: 'INR'
    },
    frequency:{
        type: String,
        enum: ['daily','weekly','monthly','yearly'],
        required: [true, "Subscription frequency is required"]},
    category:{
        type: String,
        enum: ['business','entertainment','general','health','science','sports','technology'],
        required: [true, "Subscription category is required"]
    },
    paymentMethod:{
        type: String,
        required: [true, "Subscription payment method is required"],
        trim: true,
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type: Date,
        validate: {
            validator: function(v){
                return v <= new Date();
            },
            message: 'Start date must be in the past'
        },
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function(v){
                return v > this.startDate;
            },
            message: 'End date must be greater than start date'
        },
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
        index:true
    }
}, {timestamps: true});


subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalDates={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalDates[this.frequency]);
    }

    if(this.renewalDate <= new Date()){
        this.status = 'expired';
    }

    next();
});

export default mongoose.model('Subscription', subscriptionSchema);